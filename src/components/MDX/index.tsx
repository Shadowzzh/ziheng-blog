import { cn } from '@/utils';
import { useMDXComponent } from 'next-contentlayer/hooks';

interface MdxProps {
  code: string;
  className?: string;
}

/** MDX component */
export const Mdx = (props: MdxProps) => {
  const { code } = props;
  const Component = useMDXComponent(code);

  const mdxComponents = {};

  return (
    <div className={cn('mdx', props.className)}>
      <Component components={mdxComponents} />
    </div>
  );
};
