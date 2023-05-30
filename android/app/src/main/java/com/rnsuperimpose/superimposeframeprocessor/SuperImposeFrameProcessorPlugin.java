package com.rnsuperimpose.superimposeframeprocessor;

import android.annotation.SuppressLint;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.PointF;
import android.graphics.Rect;
import android.media.Image;
import android.util.Base64;
import android.util.Log;
import android.widget.ImageView;

import androidx.camera.core.ImageProxy;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.google.gson.Gson;
import com.google.mlkit.common.MlKitException;
import com.google.mlkit.vision.common.InputImage;
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;
import com.google.mlkit.vision.common.internal.ImageConvertUtils;


import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.util.Arrays;

public class SuperImposeFrameProcessorPlugin extends FrameProcessorPlugin {

  public static ReadableArray convert(byte[] byteArray) {
    WritableNativeArray writableArray = new WritableNativeArray();

    for (byte b : byteArray) {
      writableArray.pushInt((int) b);
    }

    return writableArray;
  }

  @Override
  public Object callback(ImageProxy frame, Object[] params) {

    Image mediaImage = frame.getImage();

    Gson gson = new Gson();

    Log.i("frameImage", gson.toJson(mediaImage));
    Log.i("frameImage2", String.valueOf(mediaImage));

    Log.i("params", Arrays.toString(params));

//    WritableNativeArray array = new WritableNativeArray();
    WritableNativeMap map = new WritableNativeMap();


    if (mediaImage != null) {
      InputImage frameImage = InputImage.fromMediaImage(mediaImage, frame.getImageInfo().getRotationDegrees());
      Bitmap frameImageBitmap = null;

      try {
        frameImageBitmap = ImageConvertUtils.getInstance().getUpRightBitmap(frameImage);
        Bitmap newBitmap = Bitmap.createBitmap(frameImageBitmap.getWidth(), frameImageBitmap.getHeight(), Bitmap.Config.ARGB_8888);

        Canvas imageCanvas = new Canvas(newBitmap);
        imageCanvas.drawCircle(50, 50, 50, new Paint(Paint.ANTI_ALIAS_FLAG));

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        newBitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream.toByteArray();
        String base64String = Base64.encodeToString(byteArray, Base64.DEFAULT);

//        imageCanvas.drawBitmap(frameImageBitmap, 0, 0, null);

//        ByteArrayOutputStream stream = new ByteArrayOutputStream();
//
//        newBitmap.compress(Bitmap.CompressFormat.PNG, 100, stream);
//        byte[] byteArray = stream.toByteArray();
//
//          Log.i("byteArray", String.valueOf(byteArray));
//
//        Log.i("byteArray2", gson.toJson(convert(byteArray)));

        Log.i("base64String", base64String);

        map.putString("base64Image", base64String);

//        array.pushMap(map);

        //      array.pushMap(imageCanvas);
      }catch (Exception e) {
        e.printStackTrace();
        return null;
      }
    }

    // code goes here


    return  map;
  }

  public SuperImposeFrameProcessorPlugin() {
    super("superImposeImage");
  }
}