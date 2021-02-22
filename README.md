# React Native issue #30277

This repo aim to provide explanation, discussion and cross-project workaround ideas for the [React Native issue #30277](https://github.com/facebook/react-native/issues/30277). 

## Issue

**Bug**: 
Android ReactActivity destroy prevents successful onActivityResult calls for any native android module. This is the case when opening the camera using the `android.media.action.IMAGE_CAPTURE` intent, and in some case even the file picker. 
Details about this can be found on the issue by [zsweigart on RN repo #30277](https://github.com/facebook/react-native/issues/30277). 

**Context**: specific devices with vendor android clunky versions

**Devices with reproduction** 
- Xiaomi Redmi 7A with MIUI 12.0.1 (not older version), verified ✅ 
- Xiaomi Redmi 8A with MIUI 12.0.1, verified ❎
- _Add a pull request if you can reproduce this on other devices_

## Workaround

This is a work in progress to patch the issue while it is maybe fix in a newer React-Native version. 

Ideas:
- https://github.com/HugoGresse/react-native-issue-30277/issues/1
- submit your own ideas

You can use the android project from this repo to dig into the issue. 

## Related issues

**react-native-image-crop-picker**
- https://github.com/ivpusic/react-native-image-crop-picker/issues/955
- https://github.com/ivpusic/react-native-image-crop-picker/issues/1195
- https://github.com/ivpusic/react-native-image-crop-picker/issues/240
- https://github.com/ivpusic/react-native-image-crop-picker/issues/1519
- and many more

**react-native-image-picker**
- https://github.com/react-native-image-picker/react-native-image-picker/issues/1502

**expo-image-picker**
- https://github.com/expo/expo/issues/11103
