# Instruction to apply the patch for the missing [onActivityResult #30277](https://github.com/HugoGresse/react-native-issue-30277#react-native-issue-30277) on the package `react-native-image-crop-picker`

## Disclaimer
This is a first patch version, only for the camera, and has not been yet tested in production (it will be soon within [Pl@ntNet](https://play.google.com/store/apps/details?id=org.plantnet)). Use it at your own risk. Multiple images has not been tested at all. 

## Setup

1. Copy the [patch file](https://github.com/HugoGresse/react-native-issue-30277/blob/main/patches/react-native-image-crop-picker%2B0.36.0.patch) to your project `/patch` directory
2. Apply the patch: 
    - if you already have `patch-package` setup: `npm i`
    - for new `patch-package` users, follow [those instructions](https://github.com/ds300/patch-package#readme) and then `npm i`
3. Update/patch your `MainActivity.java`: 

    ```java
    import com.facebook.react.ReactActivity;
    import com.reactnative.ivpusic.imagepicker.patch30277.PickerModule30277Workaround;
    
    public class MainActivity extends ReactActivity {
    
        private final PickerModule30277Workaround mPickerModule30277Workaround = new PickerModule30277Workaround();
    
        /**
         * Returns the name of the main component registered from JavaScript. This is used to schedule
         * rendering of the component.
         */
        @Override
        protected String getMainComponentName() {
            return "threeZeroTwoSevenSeven";
        }
    
        @Override
        public void onActivityResult(int requestCode, int resultCode, Intent data) {
            super.onActivityResult(requestCode, resultCode, data);
            mPickerModule30277Workaround.onActivityResultTriggered(getReactInstanceManager(), requestCode, resultCode, data);
        }
    
        @Override
        protected void onResume() {
            super.onResume();
            mPickerModule30277Workaround.onActivityResume(this, getReactInstanceManager());
        }
    
        @Override
        protected void onStop() {
            super.onStop();
            mPickerModule30277Workaround.onActivityStop(getReactInstanceManager());
        }
    }

    ```

## Usage

Unfortunately, as the app is restarted, the native to js link no longer exist (the Promise in this case), it's gone 💫.  
So the patch only works with additional code.  

⚠️ Only use it on Android, the bridge was not patched for iOS with a blank method (if you can, submit a Pull Request!) ⚠️ 

When the app is started, a method from the module is exposed and will return a Promise with the image or undefined if no data to recover:
```
    useEffect(() => {
        if (Platform.OS !== 'android') {
            return
        }

        ImagePicker.recoverLastImageUri().then(image => {
            if(image){
                console.log("Image recovered", image);
                setPhoto(image);
            }
        })
    }, [])
```

For Class Components, a suitable method could be `componentDidMount`

Note: the method should return the same information as the original broken Promise, and it's behavior should be identical for a single. The image should still respect the options sent to the module. In case of multiple images at once, it is most likely different though (check `ResultCollector.java`) 
