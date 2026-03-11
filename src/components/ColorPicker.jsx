function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export default function ColorPicker({activeColor, setActiveColor, personalSectionColor, setPersonalSectionColor}) {
  return (
    <>
      <input
        type='color' 
        className='color-picker'
        value={activeColor}
        onChange={(e) => {
          const hexColor = e.target.value; 
          const { r, g, b } = hexToRgb(hexColor);
          const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          const isBrighter = brightness > 127.5;
          setPersonalSectionColor(isBrighter ? 'black' : 'white');
          setActiveColor(e.target.value);
        }}
        style={{ backgroundColor: activeColor}}>
      </input>
    </>
  )
}