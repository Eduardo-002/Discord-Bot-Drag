exports.help = ({message}) => {
  const respString = 
`\n
!rules => display the server rules\n
!bosses => display all the bosses names\n
\n
!claim get <boss name> => display the claims of the boss\n
!claim set <*boss name> <*position> => claims a position in the boss list\n
!claim clear <*boss name> <index> => clear the boss list\n
\n
!order get => display current boss order\n
!order set <boss name> <place> => set's the place of the boss in the queue\n
!order next => shifts the list one boss\n
!order clear => clear's the list\n
\n
!getSetup <car name> <index> => display list of setups\n
!setSetup <*car name> <*values> => set's a new setup\n
!removeSetup <*car name> <*index> => remove car setup\n
`
  message.reply(respString)
}