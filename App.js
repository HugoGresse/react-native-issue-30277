import React, { useState } from 'react'
import  {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text, Image,
  StatusBar, Pressable,
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import { PERMISSIONS } from 'react-native-permissions'
import { requireExtStoragePermissionIfNeeded } from './permissions'

const App: () => React$Node = () => {
  const [photos, setPhotos] = useState([])

  const takePhoto = async () => {
    await requireExtStoragePermissionIfNeeded(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
        .then(granted => {
          if(granted) {
            return requireExtStoragePermissionIfNeeded(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
          }
          throw new Error('NO PERMISSIONS')
        })
        .then(isPermissionGranted => {
          if(isPermissionGranted) {
            return true
          }
          throw new Error('NO PERMISSIONS')
        })
        .then(() => {
          return ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false,
          })
        })
        .then(image => {
          console.log("Image received", image)
          setPhotos([{
            uri: image.uri,
            path: image.path,
            width: image.width,
            height: image.height,
            mime:  "image/jpeg",
          }])
        } )

  }

  return (
      <>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              contentContainerStyle={{ flexGrow: 1 }}
              style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>React Native issue #30277 onActivityResult</Text>
              </View>

              <Pressable onPress={takePhoto} style={styles.button}><Text>📸 Take photo</Text></Pressable>

              {photos.length === 0 && <Text>NO PHOTOS</Text>}
              {
                photos.length > 0 && <Image source={{
                  ...photos[0],
                  uri: "file:///"+photos[0].path
                }} style={styles.previewImage}/>
              }

            </View>
          </ScrollView>
        </SafeAreaView>
      </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  button: {
    margin: 10,
    padding: 10,
    borderColor: '#777',
    backgroundColor: '#EEE',
    borderWidth: 1,
    borderRadius: 4,
  },
  previewImage: {
    maxWidth: 300,
    height: 300
  },
})

export default App
