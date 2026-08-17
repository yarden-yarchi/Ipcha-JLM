import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export function revalidatePaths(paths: string[]) {
  const afterChange: CollectionAfterChangeHook = ({ doc }) => {
    for (const path of paths) revalidatePath(path)
    return doc
  }

  const afterDelete: CollectionAfterDeleteHook = ({ doc }) => {
    for (const path of paths) revalidatePath(path)
    return doc
  }

  return { afterChange, afterDelete }
}
