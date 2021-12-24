export interface Heroe {
    id: string,
    name: string,
    appearance: {
        ['hair-color']: string,
        ['eye-color']: string,
        race: string,
        gender: string,
        weight: string,
        height: string
    },
    biography: {
        alignment: string,
        ['place-of-birth']: string,
        ['first-appearance']: string,
        publisher: string,
        ['full-name']: string,
        ['alter-egos']: string,
        aliases: string
    },
    image: {
        url: string
    },
    connections: {
        ['group-affiliation']: string,
        relatives: string
    },
    work: {
        occupation: string,
        base: string
    },
    powerstats: {
        combat: any,
        durability: any,
        intelligence: any,
        power: any,
        speed: any,
        strength: any,
    }
}
