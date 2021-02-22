import { check, request, RESULTS } from 'react-native-permissions';

export const requireExtStoragePermissionIfNeeded = async (permissionName) => {
    if(Platform.OS === "ios") {
        return true
    }
    // Request permissions to display images if needed:
    return check(permissionName)
        .then(result => {
            switch (result) {
                case RESULTS.GRANTED:
                case RESULTS.UNAVAILABLE:
                    return true
                case RESULTS.DENIED:
                case RESULTS.BLOCKED:
                    console.log(
                        'The read ext storage permission is not granted',
                    );
                    return false
            }
        })
        .then(granted => {
            if(!granted) {
                return request(permissionName)
                    .then(result => {
                        switch (result) {
                            case RESULTS.GRANTED:
                            case RESULTS.UNAVAILABLE:
                                return true
                            case RESULTS.DENIED:
                            case RESULTS.BLOCKED:
                                return false
                        }
                    })
            }
            return true
        })
        .catch(error => {
            console.log("Failed to grant permission", error);
            return false
        });
}
