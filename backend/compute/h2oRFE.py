import pandas
import h2o
from h2o.estimators import H2ORandomForestEstimator

def automl(file):
    # Start H2O cluster
    h2o.init()
    #check that the file is in csv format and that its a valid file that exists
    # if not file.lower().endswith('.csv') or not os.path.isfile(file):
    #     print("The file must be in .csv format.")
    #     h2o.shutdown()  
    # Load your dataset
    data = h2o.H2OFrame(file)

    # Identify the response variable
    # Replace with your actual response column name
    # You can try "CREDIT_SCORE" if you use the dataset above
    # response_column = input("Enter the response column name: ")
    response_column = "life_span"

    # Split the data into training and testing sets
    train, test = data.split_frame(ratios=[0.8])

    # Define the features and response variable
    x = data.columns
    x.remove(response_column)

    # Initialize and train the model
    rf_model = H2ORandomForestEstimator(ntrees=50, max_depth=20, nfolds=5)
    rf_model.train(x=x, y=response_column, training_frame=train)

    # Evaluate the model on the test set
    performance = rf_model.model_performance(test_data=test)
    # print(performance)

    #get the number of features, excluding the response column (-1)
    num_features = data.ncol - 1  
    # print(f"Number of features excluding the response column is: {num_features}")

    #plot the data
    rf_model.varimp_plot(num_of_features = num_features)

    # Save the model
    model_path = h2o.save_model(model=rf_model, force=True)
    print(f"Model saved to: {model_path}")

    #get the number of rows and columns
    #this also says the type of each value
    data.describe()

    # Stop the H2O cluster
    h2o.shutdown()
    return model_path
