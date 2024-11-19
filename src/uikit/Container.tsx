export const Container = ({ children, ...rest }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...rest}>{children}</div>
}
