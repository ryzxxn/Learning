from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from PIL import Image
import numpy as np

# # Directory containing your dataset
# dataset_dir = "D:/Github_Code/AI/Hand-written-number-recorgnition/DIGIT"

# # Define image data generators for training and validation
# train_datagen = ImageDataGenerator(
#     rescale=1./255,
#     validation_split=0.1  # Split data into 80% training and 20% validation
# )

# train_generator = train_datagen.flow_from_directory(
#     dataset_dir,
#     target_size=(50, 50),  # Resize images to 50x50
#     batch_size=32,
#     color_mode='grayscale',  # Load images as grayscale
#     class_mode='sparse',   # Use 'sparse' for single-label classification
#     subset='training'      # Specify training subset
# ) 

# validation_generator = train_datagen.flow_from_directory(
#     dataset_dir,
#     target_size=(50, 50),  # Resize images to 50x50
#     batch_size=32,
#     color_mode='grayscale',  # Load images as grayscale
#     class_mode='sparse',   # Use 'sparse' for single-label classification
#     subset='validation'    # Specify validation subset
# )

# # Define the model architecture
# model = Sequential([
#     Conv2D(32, (3, 3), activation='relu', input_shape=(50, 50, 1)),
#     MaxPooling2D((2, 2)),
#     Conv2D(64, (3, 3), activation='relu'),
#     MaxPooling2D((2, 2)),
#     Flatten(),
#     Dense(64, activation='relu'),
#     Dense(10, activation='softmax')
# ])

# # Compile the model
# model.compile(optimizer='adam',
#               loss='sparse_categorical_crossentropy',
#               metrics=['accuracy'])

# # Train the model
# history = model.fit(train_generator, epochs=15, validation_data=validation_generator)

# # Save the model
# model.save("handwritten_digit_model.h5")

# # Evaluate the model
# test_loss, test_acc = model.evaluate(validation_generator)
# print("Test accuracy:", test_acc)

# Load the image for prediction
image_path = "D:/Github_Code/AI/Hand-written-number-recorgnition/Predict/image.png"
img = Image.open(image_path)

# Convert image to grayscale mode
img = img.convert('L')

# Preprocess the image
img = img.resize((50, 50))  # Resize the image to match the input shape of the model
img_array = np.array(img) / 255.0  # Normalize pixel values to range [0, 1]
img_array = np.expand_dims(img_array, axis=-1)  # Add channel dimension

# Load the saved model
loaded_model = load_model("hwnc_model.h5")

# Make predictions on a new image
predictions = loaded_model.predict(np.expand_dims(img_array, axis=0))

# Get the predicted class label (digit)
predicted_class = np.argmax(predictions)

print("Number is:", predicted_class)
