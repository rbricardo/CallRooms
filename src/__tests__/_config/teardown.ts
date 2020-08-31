module.exports = async (): Promise<void> => {
  global.__appServer__.close()
}
