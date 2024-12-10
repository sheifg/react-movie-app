const VideoSection = ({ videoKey }) => {
  return (
    <div className="w-10/12 md:w-3/5 mx-auto mt-3">
      <div
        className="relative w-full overflow-hidden rounded-sm"
        style={{ paddingTop: "56.25%" }}
      >
        {/* iframe allows to display another webpage in the webpage */}
        <iframe
          className="absolute top-0 bottom-0 left-0 h-full w-full"
          allowFullScreen
          title="Youtube Video"
          // autoplay: automatically the video starts to reproduce it
          // mute=1: the sound is muted
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`}
        />
      </div>
    </div>
  );
};

export default VideoSection;
