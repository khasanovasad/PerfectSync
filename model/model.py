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
import joblib
import sys

def main():
    # Check if arguments are provided
    if len(sys.argv) > 1:
        # Get all arguments (starting from index 1, as sys.argv[0] is the script name)
        fileName = sys.argv[1]

        with open(fileName, 'r') as file:
            # Step 2: Load and parse the JSON data
            example = json.load(file)

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

        # Load the model
        loaded_model = joblib.load('../model/house_price_model.joblib')

        foo = loaded_model.predict(X.iloc[0].to_frame().T)

        print(foo[0])

    else:
        print("No arguments passed.")

if __name__ == "__main__":
    main()
