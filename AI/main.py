import os
import cv2 
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf

mnist = tf.keras.datasets.mnist
(x_train, y_train), (x_test, y_test) = mnist.load_data()

# x_train = tf.keras.utils.normalize(x_train, axis=1)
# x_test = tf.keras.utils.normalize(x_test, axis=1)
# model = tf.keras.models.Sequential()
# model.add(tf.keras.layers.Flatten(input_shape=(28, 28)))
# model.add(tf.keras.layers.Dense(128, activation = 'relu'))
# model.add(tf.keras.layers.Dense(10, activation = 'softmax'))
# # Compile the model
# model.compile(optimizer=r'adam', loss=r'sparse_categorical_crossentropy', metrics=[r'accuracy'])
# model.fit(x_train, y_train, epochs=50)
# model.save('model.keras')


model = tf.keras.models.load_model('model.keras')


# Evaluate the model
loss, accuracy = model.evaluate(x_test, y_test)
# Print the loss and accuracy
print("Loss:", loss)
print("Accuracy:", accuracy)


image_number = 0
while os.path.isfile(f"Digit/digit{image_number}.jpg"):
    try:
        img = cv2.imread(f"Digit/digit{image_number}.jpg")[:,:,0]
        img = np.invert(np.array([img]))
        prediction = model.predict(img)

        print(f"This digit is likely {np.argmax(prediction)}")

        plt.imshow(img[0], cmap = plt.cm.binary)
        plt.show()
    except:
        print("Error")
    finally:
        image_number += 1
