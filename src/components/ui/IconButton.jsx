import PaddedIcon from "./PaddedIcon";

function IconButton({ Icon, color, bgColor, bgHover, onClick }) {
  return (
    <div onClick={onClick}>
      <PaddedIcon
        Icon={Icon}
        color={color}
        bgColor={bgColor}
        hoverBg={bgHover}
      />
    </div>
  );
}

export default IconButton;
