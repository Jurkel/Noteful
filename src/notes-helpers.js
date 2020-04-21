export const getNotesForFolder = (notes=[], folderId) => (
  notes.filter(note => note.folderId === folderId)
)