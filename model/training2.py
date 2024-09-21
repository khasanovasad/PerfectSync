import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error, r2_score
import lightgbm as lgb

# # Load the data
# data = pd.read_csv('house_data.csv')
# target = pd.read_csv('target.csv', header=None, names=['PricePerSqm'])

# # Calculate price per square meter
# data['PricePerSqm'] = target['PricePerSqm'] / data['Capacity']

# # Split the data into features and target
# X = data.drop(['PricePerSqm'], axis=1)
# y = data['PricePerSqm']

# Split the data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define numeric and categorical columns
numeric_features = ['Rooms', 'Level', 'Capacity', 'Longitude', 'Latitude', 'DistanceFromCenter', 'DomTutRating',
                    'school_count', 'park_count', 'supermarket_count', 'station_count', 'hospital_count',
                    'nearest_school', 'nearest_park', 'nearest_supermarket', 'nearest_station', 'nearest_hospital']
categorical_features = ['BasicData.Class', 'BasicData.Walls', 'BasicData.City', 'BasicData.Province']

# Create preprocessing steps
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])

# Combine preprocessing steps
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)
    ])

# Create a pipeline with preprocessor and model
model = Pipeline(steps=[('preprocessor', preprocessor),
                        ('regressor', lgb.LGBMRegressor(random_state=42))])

# Fit the model
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Mean Squared Error: {mse}")
print(f"R-squared Score: {r2}")