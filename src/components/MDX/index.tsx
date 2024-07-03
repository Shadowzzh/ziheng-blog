import { cn } from '@/utils';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { MdxLink } from '@/components/MDX/MdxLink';
import { ComponentProps } from 'react';
import { MdxPre } from '@/components/MDX/MdxPre';

type MDXComponentProps = ComponentProps<ReturnType<typeof useMDXComponent>>;
interface MdxProps {
  code: string;
  className?: string;
}

const mdxComponents = {
  a: MdxLink,
  pre: MdxPre
} as MDXComponentProps['components'];

/** MDX component */
export const Mdx = (props: MdxProps) => {
  const { code } = props;
  const Component = useMDXComponent(code);

  return (
    <article className={cn('mdx prose', props.className)}>
      <Component components={mdxComponents} />
    </article>
  );
};
