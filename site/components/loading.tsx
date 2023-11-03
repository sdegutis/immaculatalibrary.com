const sizes = [80, 90, 70, 95, 75, 60, 85];

export const LoadingItem: JSX.Component<{ lines: number }> = ({ lines }) => <>
  {sizes.slice(0, lines).map(size =>
    <LoadingBox size={`${size}%`} />
  )}
</>;

export const LoadingBox: JSX.Component<{ size: string }> = ({ size }) => <>
  <link rel='stylesheet' href='/css/components/loading.css' />
  <span style={`width: ${size};`} class='loading-item' />
</>;
