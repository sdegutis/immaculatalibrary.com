const sizes = [80, 90, 70, 95, 75, 60, 85];

export const LoadingParagraph: JSX.Component<{ lines: number, fullWidth?: boolean }> = ({ lines, fullWidth }) => <p>
  {fullWidth
    ? Array(lines).fill(0).map((_, i) =>
      <LoadingLine size={`${i < (lines - 1) ? 100 : 70}%`} />
    )
    : sizes.slice(0, lines).map(size =>
      <LoadingLine size={`${size}%`} />
    )
  }
</p>;

export const LoadingLine: JSX.Component<{ size: string }> = ({ size }) => <>
  <link rel='stylesheet' href='/css/components/loading.css' />
  <span style={`width: ${size};`} class='loading-item' />
</>;

export const HomeLoading = () => <>
  <LoadingLine size="7em" />
  <LoadingParagraph lines={7} />
  <blockquote>
    <LoadingParagraph lines={7} fullWidth />
    <LoadingParagraph lines={7} fullWidth />
    <LoadingParagraph lines={7} fullWidth />
    <LoadingParagraph lines={7} fullWidth />
    <LoadingParagraph lines={7} fullWidth />
  </blockquote>
  <LoadingLine size="7em" />
</>;
