import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import h2o
from h2o.automl import H2OAutoML

# Replace with your dataset
df = pd.read_csv("my_dataset")
df.head()
df.isna().sum()

h2o.init()

train_df = h2o.H2OFrame(df)
train_df.describe()

x = train_df.columns

# Replace with your actual column
y = "my_column"
#y = [ i for i in y if i.isdigit() ]
x.remove(y)
#x.remove('int')

aml = H2OAutoML(max_runtime_secs = 600,
                # exclude_algos =['DeepLearning'],
                seed = 1,
                # stopping_metric ='logloss',
                # sort_metric ='logloss',
                balance_classes = False,
                project_name ='Project_1'
)
# train model and record time % time 
aml.train(x = x, y = y, training_frame = train_df)

lb = aml.leaderboard
# Print all rows instead of 10 rows
lb.head(rows = lb.nrows)

se = aml.leader
 
# Get the metalearner model of top model
metalearner = h2o.get_model(se.metalearner()['name'])
 
# list baselearner models :
metalearner.varimp()

model = h2o.get_model('XGBoost_grid__1_AutoML_20200714_173719_model_5')
model.model_performance(test)

model.varimp_plot(num_of_features = 9)
model_path = h2o.save_model(model = model, path ='sample_data/', force = True)
