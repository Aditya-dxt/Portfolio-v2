import { Game } from '../../Game.js'
import { LandingArea } from './LandingArea.js'
import { ProjectsArea } from './ProjectsArea.js'
import { HackathonsArea } from './HackathonsArea.js'
import { LabArea } from './LabArea.js'
import { CareerArea } from './CareerArea.js'
import { SocialArea } from './SocialArea.js'
import { ToiletArea } from './ToiletArea.js'
import { BowlingArea } from './BowlingArea.js'
import { CircuitArea } from './CircuitArea.js'
import { AchievementsArea } from './AchievementsArea.js'
import { TimeMachineArea } from './TimeMachineArea.js'
import { EasterArea } from './EasterArea.js'

export class Areas
{
    constructor()
    {
        this.game = Game.getInstance()

        const list = [
            [ 'achievements', AchievementsArea ],
            [ 'bowling', BowlingArea ],
            [ 'career', CareerArea ],
            [ 'circuit', CircuitArea ],
            [ 'lab', LabArea ],
            [ 'landing', LandingArea ],
            [ 'projects', ProjectsArea ],
            [ 'social', SocialArea ],
            [ 'toilet', ToiletArea ],
            [ 'timeMachine', TimeMachineArea ],
        ]

        const model = [...this.game.resources.areasModel.scene.children]
        
        // Setup 3D Hackathons area: clone projects hierarchy before AreaClass modifies child positions
        const projectsOriginal = model.find(c => c.name.startsWith('projects'))
        if(projectsOriginal)
        {
            const hackathonsModel = projectsOriginal.clone(true)
            hackathonsModel.name = 'hackathons'
            hackathonsModel.position.set(12.251, 3.273, 35.251)
            this.hackathons = new HackathonsArea(hackathonsModel)
        }

        const removedAreaNames = ['altar', 'behindTheScene', 'cookie']
        for(const child of model)
        {
            if(removedAreaNames.some(name => child.name.startsWith(name)))
            {
                child.visible = false
                this.game.resources.areasModel.scene.remove(child)
                continue
            }
            for(const [ name, AreaClass ] of list)
            {
                if(child.name.startsWith(name))
                    this[name] = new AreaClass(child)
            }
        }
    }
}
