const sizes = [80, 90, 70, 95, 75, 60, 85];

export const LoadingItem: JSX.Component<{ lines: number }> = ({ lines }) => <p>
  <link rel='stylesheet' href='/css/components/loading.css' />
  {sizes.slice(0, lines).map(size =>
    <div style={`width: ${size}%;`} class='loading-item' />
  )}
</p>;
