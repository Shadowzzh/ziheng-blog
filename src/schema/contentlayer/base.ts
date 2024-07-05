import type { ComputedFields } from 'contentlayer/source-files';
import readingTime from 'reading-time';

export const defaultComputedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => `/${doc._raw.flattenedPath}`
  },
  readingWords: {
    type: 'number',
    resolve: (doc) => readingTime(doc.body.code).words
  },
  readingTime: {
    type: 'number',
    resolve: (doc) => readingTime(doc.body.code).time
  },
  readingText: {
    type: 'string',
    resolve: (doc) => readingTime(doc.body.code).text
  },
  readingMinutes: {
    type: 'number',
    resolve: (doc) => readingTime(doc.body.code).minutes
  }
};
