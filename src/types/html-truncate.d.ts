declare module "html-truncate" {
  function truncate(
    html: string,
    length: number,
    options?: { ellipsis?: string }
  ): string;
  export default truncate;
}
