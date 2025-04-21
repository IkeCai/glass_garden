from moviepy.editor import VideoFileClip, concatenate_videoclips

# Load your original video
clip = VideoFileClip("my-app/src/assets/flower_background.mp4")

# Create reversed version
clip_reverse = clip.fx(vfx.time_mirror)

# Concatenate forward + backward
final_clip = concatenate_videoclips([clip, clip_reverse])

# Export the result
final_clip.write_videofile("my-app/src/assets/boomerang_video.mp4", codec="libx264", audio=True)
