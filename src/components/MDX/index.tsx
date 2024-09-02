import { cn } from '@/utils';
import { useMDXComponent } from 'next-contentlayer/hooks';
import type { ComponentProps } from 'react';
import { MdxLink } from '@/components/MDX/MdxLink';
import { MdxFigure } from '@/components/MDX/MdxFigure';
import { MdxImage } from '@/components/MDX/MdxImage';

type MDXComponentProps = ComponentProps<ReturnType<typeof useMDXComponent>>;
interface MdxProps {
  code: string;
  className?: string;
}

const mdxComponents = {
  a: MdxLink,
  figure: MdxFigure,
  Image: MdxImage
} as MDXComponentProps['components'];

/** MDX component */
export const Mdx = (props: MdxProps) => {
  const { code } = props;
  const Component = useMDXComponent(code);

  return (
    <article id='article-content' className={cn('mdx prose', props.className)}>
      <Component components={mdxComponents} />
    </article>
  );
};
