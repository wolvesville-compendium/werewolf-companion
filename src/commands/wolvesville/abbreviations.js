module.exports = class Abbreviations extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'Abbreviations for all the roles within Wolvesville.',
            category: module.filename.split('/').slice(-2)[0],
            permissions: { channel: ['EMBED_LINKS'] },
            aliases: ['abb']
        })
    }

    async run({ message, args, user }) {
        let roles = Object.values(message._('roles')),
            village = roles.filter(r => r.team.includes('Village')),
            werewolves = roles.filter(r => r.team.includes('Werewolves')),
            solo = roles.filter(r => r.team.includes('Solo') || r.team.includes('Team'));

        message.send({ message, title: message._('abbreviations') }, [
            [message._('village'), village.map(v => `${v.name} = ${v.abbreviations}`)],
            [message._('werewolves'), werewolves.map(v => `${v.name} = ${v.abbreviations}`)],
            [message._('solo'), solo.map(v => `${v.name} = ${v.abbreviations}`)]
        ])
    }
}
