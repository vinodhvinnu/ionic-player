package com.hutchind.cordova.plugins.streamingmedia;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.graphics.Color;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.ScaleGestureDetector;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.MediaController;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.VideoView;

public class SimpleVideoStream extends Activity implements
	MediaPlayer.OnCompletionListener, MediaPlayer.OnPreparedListener,
	MediaPlayer.OnErrorListener, MediaPlayer.OnBufferingUpdateListener {
	private String TAG = getClass().getSimpleName();
	private CustomVideoView mVideoView = null;
	private MediaPlayer mMediaPlayer = null;
	private MediaController mMediaController = null;
	private ProgressBar mProgressBar = null;
	private String mVideoUrl;
	private Boolean mShouldAutoClose = true;

	static final int MIN_WIDTH = 100;
	// Root view's LayoutParams
	private RelativeLayout.LayoutParams mRootParam;
	// Custom Video View
	// detector to pinch zoom in/out
	private ScaleGestureDetector mScaleGestureDetector;
	// detector to single tab
	private GestureDetector mGestureDetector;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		this.requestWindowFeature(Window.FEATURE_NO_TITLE);
		this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);

		Bundle b = getIntent().getExtras();
		mVideoUrl = b.getString("mediaUrl");
		mShouldAutoClose = b.getBoolean("shouldAutoClose");
		mShouldAutoClose = mShouldAutoClose == null ? true : mShouldAutoClose;

		RelativeLayout relLayout = new RelativeLayout(this);

		relLayout.setBackgroundColor(Color.BLACK);
		RelativeLayout.LayoutParams relLayoutParam = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.MATCH_PARENT, RelativeLayout.LayoutParams.MATCH_PARENT);
		mRootParam = relLayoutParam;
		relLayoutParam.addRule(RelativeLayout.CENTER_IN_PARENT, RelativeLayout.TRUE);
		mVideoView = new CustomVideoView(this);
		mVideoView.setLayoutParams(relLayoutParam);
		relLayout.addView(mVideoView);

		// Create progress throbber
		mProgressBar = new ProgressBar(this);
		mProgressBar.setIndeterminate(true);
		// Center the progress bar
		RelativeLayout.LayoutParams pblp = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT, RelativeLayout.LayoutParams.WRAP_CONTENT);
		pblp.addRule(RelativeLayout.CENTER_IN_PARENT, RelativeLayout.TRUE);
		mProgressBar.setLayoutParams(pblp);
		// Add progress throbber to view
		relLayout.addView(mProgressBar);
		mProgressBar.bringToFront();

		setOrientation(b.getString("orientation"));

		setContentView(relLayout, relLayoutParam);

		play();
	}

	private void play() {
		mProgressBar.setVisibility(View.VISIBLE);
		Uri videoUri = Uri.parse(mVideoUrl);
		try {
			mVideoView.setOnCompletionListener(this);
			mVideoView.setOnPreparedListener(this);
			mVideoView.setOnErrorListener(this);
			mVideoView.setVideoURI(videoUri);
			mMediaController = new MediaController(this);
			mMediaController.setAnchorView(mVideoView);
			mMediaController.setMediaPlayer(mVideoView);
			mVideoView.setMediaController(mMediaController);

			mScaleGestureDetector = new ScaleGestureDetector(this, new MyScaleGestureListener());
			mGestureDetector = new GestureDetector(this, new MySimpleOnGestureListener());
			mVideoView.setOnTouchListener(new View.OnTouchListener() {

				@Override
				public boolean onTouch(View v, MotionEvent event) {
					mGestureDetector.onTouchEvent(event);
					mScaleGestureDetector.onTouchEvent(event);
					return true;
				}
			});
		} catch (Throwable t) {
			Log.d(TAG, t.toString());
		}
	}

	private void setOrientation(String orientation) {
		if ("landscape".equals(orientation)) {
			this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
		}else if("portrait".equals(orientation)) {
			this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
		}
	}

	private Runnable checkIfPlaying = new Runnable() {
		@Override
		public void run() {
			if (mVideoView.getCurrentPosition() > 0) {
				// Video is not at the very beginning anymore.
				// Hide the progress bar.
				mProgressBar.setVisibility(View.GONE);
			} else {
				// Video is still at the very beginning.
				// Check again after a small amount of time.
				mVideoView.postDelayed(checkIfPlaying, 100);
			}
		}
	};

	@Override
	public void onPrepared(MediaPlayer mp) {
		Log.d(TAG, "Stream is prepared");
		mMediaPlayer = mp;
		mMediaPlayer.setOnBufferingUpdateListener(this);
		mVideoView.requestFocus();
		mVideoView.start();
		mVideoView.postDelayed(checkIfPlaying, 0);
	}

	private void pause() {
		Log.d(TAG, "Pausing video.");
		mVideoView.pause();
	}

	private void stop() {
		Log.d(TAG, "Stopping video.");
		mVideoView.stopPlayback();
	}

	@Override
	public void onDestroy() {
		super.onDestroy();
		stop();
	}

	private void wrapItUp(int resultCode, String message) {
		Intent intent = new Intent();
		intent.putExtra("message", message);
		setResult(resultCode, intent);
		finish();
	}

	public void onCompletion(MediaPlayer mp) {
		stop();
		if (mShouldAutoClose) {
			wrapItUp(RESULT_OK, null);
		}
	}

	public boolean onError(MediaPlayer mp, int what, int extra) {
		StringBuilder sb = new StringBuilder();
		sb.append("MediaPlayer Error: ");
		switch (what) {
			case MediaPlayer.MEDIA_ERROR_NOT_VALID_FOR_PROGRESSIVE_PLAYBACK:
				sb.append("Not Valid for Progressive Playback");
				break;
			case MediaPlayer.MEDIA_ERROR_SERVER_DIED:
				sb.append("Server Died");
				break;
			case MediaPlayer.MEDIA_ERROR_UNKNOWN:
				sb.append("Unknown");
				break;
			default:
				sb.append(" Non standard (");
				sb.append(what);
				sb.append(")");
		}
		sb.append(" (" + what + ") ");
		sb.append(extra);
		Log.e(TAG, sb.toString());

		wrapItUp(RESULT_CANCELED, sb.toString());
		return true;
	}

	public void onBufferingUpdate(MediaPlayer mp, int percent) {
		Log.d(TAG, "onBufferingUpdate : " + percent + "%");
	}

	@Override
	public void onBackPressed() {
		// If we're leaving, let's finish the activity
		wrapItUp(RESULT_OK, null);
	}

	@Override
	public void onConfigurationChanged(Configuration newConfig) {
		// The screen size changed or the orientation changed... don't restart the activity
		super.onConfigurationChanged(newConfig);
	}

//	@Override
//	public boolean onTouchEvent(MotionEvent event) {
//		if (mMediaController != null)
//			mMediaController.show();
//		return false;
//	}


	private class MySimpleOnGestureListener extends GestureDetector.SimpleOnGestureListener {

		@Override
		public boolean onSingleTapConfirmed(MotionEvent e) {
			/*if (mVideoView == null)
				return false;
			if (mVideoView.isPlaying())
				mVideoView.pause();
			else
				mVideoView.start();*/
			if(mMediaController != null){
				if ( mMediaController.isShowing()){
					mMediaController.hide();
				}else{
					mMediaController.show();
				}
			}

			return true;
		}

	}

	private class MyScaleGestureListener implements ScaleGestureDetector.OnScaleGestureListener {
		private int mW, mH;

		@Override
		public boolean onScale(ScaleGestureDetector detector) {
			// scale our video view
			mW *= detector.getScaleFactor();
			mH *= detector.getScaleFactor();
			if (mW < MIN_WIDTH) { // limits width
				mW = mVideoView.getWidth();
				mH = mVideoView.getHeight();
			}
			Log.d("onScale", "scale=" + detector.getScaleFactor() + ", w=" + mW + ", h=" + mH);
			mVideoView.setFixedVideoSize(mW, mH); // important
			mRootParam.width = mW;
			mRootParam.height = mH;
			return true;
		}

		@Override
		public boolean onScaleBegin(ScaleGestureDetector detector) {
			mW = mVideoView.getWidth();
			mH = mVideoView.getHeight();
			Log.d("onScaleBegin", "scale=" + detector.getScaleFactor() + ", w=" + mW + ", h=" + mH);
			return true;
		}

		@Override
		public void onScaleEnd(ScaleGestureDetector detector) {
			Log.d("onScaleEnd", "scale=" + detector.getScaleFactor() + ", w=" + mW + ", h=" + mH);
		}

	}
}

class CustomVideoView extends VideoView {

    public CustomVideoView(Context context) {
        super(context);
    }

    public CustomVideoView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public CustomVideoView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }


    /**
     * Resize video view by using SurfaceHolder.setFixedSize(...). See {@link android.view.SurfaceHolder#setFixedSize}
     * @param width
     * @param height
     */
    public void setFixedVideoSize(int width, int height)
    {
        getHolder().setFixedSize(width, height);
    }
}
