from fastapi import FastAPI
from pydantic import BaseModel
import sklearn
import joblib
from scipy.integrate import quad
import numpy as np
import pickle
app = FastAPI()

def exponential_function(x, λ):
    return λ * np.exp(-λ * x)

class params(BaseModel):
    Temp: float
    Pressure: float
    Humidity:float
    WindSpeed: float
    WindDir: float
    WindGustSpeed: float
    WindGustDir: float
    Cloud: float
    Sunshine: float
    Rainfall: float

 
with open('QuadraticDiscriminantAnalysis.pkl', 'rb') as f:
    model = joblib.load(f)

@app.get('/')
async def get():
    return {"ok":"0k"}

@app.post('/')
async def get_check(item: params):
    print('checking...')
    x = np.array([
                  [item.Temp,
                   item.Pressure,
                   item.Humidity,
                   item.WindSpeed,
                   item.WindDir,
                   item.WindGustSpeed,
                   item.WindGustDir,
                   item.Cloud,
                   item.Sunshine,
                   item.Rainfall]
                   ])
    x = x.reshape(1,-1)
    p = model.predict(x)
    print(p)
    p=p.tolist()
    p.append(0)
    dew = 0


    if p[0] == 1:
        print("rainFall is predicted")
        lower_limit = 0.50

    # ____WindSpeed___________________
        a = item.WindSpeed
        print('WindSpeed',a)
        # Perform the integration using quad() function
        a_result, _ = quad(exponential_function, lower_limit, np.inf, args=(a,))
        neg_a_result, _ = quad(exponential_function,  0,lower_limit, args=(a,))
        a1,a2 = a_result,neg_a_result
        print("probability Precision values of windspeed:", a1,a2)

    # ____Temperature___________________
        b = item.Temp
        print('Temperature',b)
        # Perform the integration using quad() function
        b_result, _ = quad(exponential_function, lower_limit, np.inf, args=(b,))
        neg_b_result, _ = quad(exponential_function,  0,lower_limit, args=(b,))
        b1,b2 = b_result,neg_b_result
        print("probability Precision of Temperature:", b1,b2)

    # ____Humidity___________________
        c = item.Humidity
        print('Humidity',c)
        # Perform the integration using quad() function
        c_result, _ = quad(exponential_function, lower_limit, np.inf, args=(c,))
        neg_c_result, _ = quad(exponential_function,  0,lower_limit, args=(c,))
        c1,c2 = c_result,neg_c_result
        print("probability Precision of Humidity:", c1,c2)

    # ____Windgustspeed___________________
        d = item.WindGustSpeed
        print('WindGustSpeed',d)
        # Perform the integration using quad() function
        d_result, _ = quad(exponential_function, lower_limit, np.inf, args=(d,))
        neg_d_result, _ = quad(exponential_function,  0,lower_limit, args=(d,))
        d1,d2 = d_result,neg_d_result
        print("probability Precision of WindGustSpeed:", d1,d2)

    # ____cloudrate___________________
        e = item.Cloud
        print('cloud',e)
        # Perform the integration using quad() function
        e_result, _ = quad(exponential_function, lower_limit, np.inf, args=(e,))
        neg_e_result, _ = quad(exponential_function,  0,lower_limit, args=(e,))
        e1,e2 = e_result,neg_e_result
        print("probability Precision of Cloud:", e1,e2)

        # ____WindSpeed___________________

        t = item.Temp
        print("temperature",t,"*C")
        # _____Calculating Relative Humidity from actual Humidity
        #Step 1: Calculate Saturation Vapor Pressure
        svp = 0.611 * np.exp((17.27 * t)/(t + 237.3))
        print(np.exp((17.27 * t)/(t + 237.3))*0.611)
        print("Saturation Vapor Pressure(svp)",svp)

        #Step 2: Calculate Relative Humidity
        rh = (item.Humidity / svp)

        print("Relative Humidity(rh)",rh)
        t = (t-32)*5/9
        dew = t-((100-rh)/5)
        print("dew_point value",abs(dew),"*C")

    if dew!=0:
        p[1]=dew

    print(p)

    d={'res': p}
    return d
    
