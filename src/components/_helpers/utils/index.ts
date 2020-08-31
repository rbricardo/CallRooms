export const parseParticipants = (participants: any) => {
  let parsedParticipants = participants
  .replace('[', '')
  .replace(']', '')
  .replace(/"/g, '')
  .replace(/"/g, '')
  parsedParticipants = parsedParticipants.split(',')

  return parsedParticipants

}
