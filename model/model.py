
"""
example = {'BasicData': {'Price': '635 692 860',
                         'Class': 'Business',
                         'Walls': 'Bricks',
                         'Level': '16',
                         'Rooms': '1',
                         'Capacity': '37.26 m²',
                         'City': 'Toshkent',
                         'Province': "Mirzo Ulug'bek",
                         'Street': 'Олий Химмат улица, Навнихол махалля',
                         'Longitude': '69.330270',
                         'Latitude': '41.349502',
                         'DomTutRating': '0/5',
                         'Url': 'https://domtut.uz/uz/nedvizhimost/zhiloj-kompleks-botanika-saroyi?plan=1',
                         'DistanceFromTheAmirTemurSquare': '6016.331234164396'},
           'PlacesAround': [{'Type': 'supermarket',
                             'Name': 'Korzinka',
                             'Longitude': '69.3338612',
                             'Latitude': '41.3552674',
                             'Distance': '708.3124695641346'}]}
"""


example = {"BasicData": {
      "Price": "3 825 000 000",
      "Class": "null",
      "Walls": "Bricks",
      "Level": "35",
      "Rooms": "3",
      "Capacity": "114.01 m²",
      "City": "Toshkent",
      "Province": "Mirzo Ulug'bek",
      "Street": "Мирзо-Улугбекский, Cherry Cake, Кары Ниязова улица",
      "Longitude": "69.295172",
      "Latitude": "41.320774",
      "DomTutRating": "0/5",
      "Url": "https://domtut.uz/uz/nedvizhimost/134382-3komn-kv114-01",
      "DistanceFromTheAmirTemurSquare": "1689.199001586041"
    },
    "PlacesAround": [
      {
        "Type": "hospital",
        "Name": "Dr. Summit",
        "Longitude": "69.2857078",
        "Latitude": "41.3172937",
        "Distance": "880.7936320099984"
      },
      {
        "Type": "railway_station",
        "Name": "Hamid Olimjon metro bekati",
        "Longitude": "69.2957419",
        "Latitude": "41.3181644",
        "Distance": "294.30528055252665"
      },
      {
        "Type": "school",
        "Name": "International House Tashkent Lyceum  ",
        "Longitude": "69.2926778",
        "Latitude": "41.3236089",
        "Distance": "378.1502042747397"
      },
      {
        "Type": "supermarket",
        "Name": "Korzinka",
        "Longitude": "69.2850299",
        "Latitude": "41.319117",
        "Distance": "867.5363311295328"
      },
      {
        "Type": "school",
        "Name": "Xitoy tili kurslari",
        "Longitude": "69.2964094",
        "Latitude": "41.3179549",
        "Distance": "330.34838673203626"
      },
      {
        "Type": "school",
        "Name": "Focus school школа искусств",
        "Longitude": "69.2863241",
        "Latitude": "41.3253376",
        "Distance": "897.1130183278958"
      },
      {
        "Type": "school",
        "Name": "",
        "Longitude": "69.2909356",
        "Latitude": "41.316631",
        "Distance": "581.3598878427773"
      },
      {
        "Type": "school",
        "Name": "Учебный центр Корейского языка",
        "Longitude": "69.2951883",
        "Latitude": "41.319845",
        "Distance": "103.39824049734239"
      },
      {
        "Type": "school",
        "Name": "Dance Club",
        "Longitude": "69.298048",
        "Latitude": "41.3197746",
        "Distance": "264.8687452141626"
      },
      {
        "Type": "school",
        "Name": "Учебный центр Кэмбридж",
        "Longitude": "69.2999334",
        "Latitude": "41.3203602",
        "Distance": "400.6254040878747"
      },
      {
        "Type": "hospital",
        "Name": "Центр медицинской реабилитации \"Прогноз\"",
        "Longitude": "69.291532",
        "Latitude": "41.3224317",
        "Distance": "355.8014406129799"
      },
      {
        "Type": "hospital",
        "Name": "Республиканская кардиологический центр",
        "Longitude": "69.3003243",
        "Latitude": "41.3241039",
        "Distance": "568.1348353089517"
      },
      {
        "Type": "school",
        "Name": "International Talent Academy",
        "Longitude": "69.2940451",
        "Latitude": "41.3130954",
        "Distance": "859.734107401575"
      },
      {
        "Type": "supermarket",
        "Name": "Korzinka",
        "Longitude": "69.3008232",
        "Latitude": "41.316596",
        "Distance": "662.8119272642089"
      },
      {
        "Type": "park",
        "Name": "парк Славянских Скульптур",
        "Longitude": "69.3033053",
        "Latitude": "41.3205546",
        "Distance": "680.2389388069697"
      }
    ]
  }

import json
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.metrics import mean_squared_error, r2_score
from xgboost import XGBRegressor
from sklearn.model_selection import RandomizedSearchCV

# # Load and preprocess the data
# with open('enriched_json_data3.json', 'r') as f:
#     data = json.load(f)

df = pd.json_normalize([example])

# Extract features from BasicData
df['Price'] = df['BasicData.Price'].str.replace(' ', '').astype(float)
df['Capacity'] = df['BasicData.Capacity'].str.split().str[0].astype(float)
df['PricePerSqm'] = df['Price'] / df['Capacity']
# df['Rooms'] = df['BasicData.Rooms'].astype(int)
df['Rooms'] = pd.to_numeric(df['BasicData.Rooms'], errors='coerce').fillna(0).astype(int)
# df['Level'] = df['BasicData.Level'].astype(int)

df['Level'] = pd.to_numeric(df['BasicData.Level'], errors='coerce').fillna(0).astype(int)

df['Longitude'] = df['BasicData.Longitude'].astype(float)
df['Latitude'] = df['BasicData.Latitude'].astype(float)
df['DistanceFromCenter'] = df['BasicData.DistanceFromTheAmirTemurSquare'].astype(float)
df['DomTutRating'] = df['BasicData.DomTutRating'].str.split('/').str[0].astype(float)

# Extract features from PlacesAround
place_types = ['school', 'park', 'supermarket', 'station', 'hospital']
for place_type in place_types:
    # Handle the case where PlacesAround is None or not iterable
    df[f'{place_type}_count'] = df['PlacesAround'].apply(
        lambda x: sum(1 for place in x if place.get('Type') == place_type) if isinstance(x, list) else 0
    )

    df[f'nearest_{place_type}'] = df['PlacesAround'].apply(
        lambda x: min((float(place['Distance']) for place in x if place.get('Type', '').lower() == place_type),
                      default=np.nan) if isinstance(x, list) else np.nan
    )

# Select features for the model
features = ['Rooms', 'Level', 'Capacity', 'Longitude', 'Latitude', 'DistanceFromCenter', 'DomTutRating'] + \
           [f'{place_type}_count' for place_type in place_types] + \
           [f'nearest_{place_type}' for place_type in place_types] + \
           ['BasicData.Class', 'BasicData.Walls', 'BasicData.City', 'BasicData.Province']

X = df[features]
# y = df['PricePerSqm']


import joblib

# Load the model
loaded_model = joblib.load('./house_price_model.joblib')

foo = loaded_model.predict(X.iloc[0].to_frame().T)

print("Hello")