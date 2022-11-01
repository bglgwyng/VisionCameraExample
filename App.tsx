/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-reanimated';

import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {
  Camera,
  CameraPermissionStatus,
  Frame,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {BarcodeFormat, scanBarcodes} from 'vision-camera-code-scanner';

const CameraApp = () => {
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.front;
  const {width, height} = useWindowDimensions();

  // FIXME: uncomment
  // const frameProcessor = useFrameProcessor(frame => {
  //   'worklet';
  //   console.info(scanBarcodes(frame, [BarcodeFormat.QR_CODE]));
  // }, []);

  return device ? (
    <Camera
      device={device}
      style={{width, height}}
      // FIXME: uncomment
      // frameProcessor={frameProcessor}
      // frameProcessorFps={5}
      isActive
    />
  ) : null;
};

const App = () => {
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>();

  useEffect(() => {
    if (cameraPermission === undefined) {
      Camera.getCameraPermissionStatus().then(setCameraPermission);
    } else {
      Camera.requestCameraPermission().then(setCameraPermission);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!cameraPermission]);

  if (cameraPermission == null) {
    return null;
  }

  const showPermissionsPage = cameraPermission !== 'authorized';

  return showPermissionsPage ? (
    <View>
      <TouchableOpacity>
        <Text />
      </TouchableOpacity>
    </View>
  ) : (
    <CameraApp />
  );
};

export default App;
