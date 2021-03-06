module.exports = class Inventory extends client.commands.class {
    constructor() {
        super({
            name: module.filename.split('/').pop().slice(0, -3),
            description: 'View your own or someone elses item inventory.',
            category: module.filename.split('/').slice(-2)[0],
            aliases: ['inv'],
            permissions: { channel: ['EMBED_LINKS', 'USE_EXTERNAL_EMOJIS'] },
            usages: [null, '<user>'],
            examples: [null, '394469731085844502', 'Apteryx', '@Apteryx#0001']
        })
    }

    async run({ message, args, user }) {
        if (args[0]) user = database.get(args.join(' '), 'user');
        if (!user || user.kind !== 'user') return message.send('No user was found with what was inputted.');

        let inventory = user.inventory,
            products = { item: [], lootbox: [], talisman: [] };

        const shop = client.constants.shop;
        Object.entries(inventory).forEach(([key, value]) => {
            let item = shop.find(i => i.id === key);
            if (value > 0) products[item.category].push(`[${key}] ${value} ${item.name.toTitleCase()} ${message.emote(item.path)}`);
        });

        let fields = [];
        Object.entries(products).forEach(([key, value]) => value.length ? fields.push([key.toTitleCase(), value.join('\n'), false]) : undefined);
        return message.send({ message, title: `${user.tag}'s Inventory`, description: `To send a rose, use \`${message.prefix}rose <user> [quantity]\`.\nTo open a lootbox use \`${message.prefix}open <lootbox type>\`.` }, fields);
    }
}
