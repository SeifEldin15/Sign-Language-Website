import {Router} from 'express'
import { addDectionary, deleteDectionary, getAlldictionaries } from './dictionaries.controller.js'
import { Validate } from '../../middlewares/validate.js'
import { addDectionaryVal, deleteDectionaryVal } from './dictionaries.validation.js'
import { allowTo, protectedRouter } from '../auth/auth.controller.js'
const  dectionaryRouter =Router()


dectionaryRouter.post('/',protectedRouter,allowTo('admin'),Validate(addDectionaryVal),addDectionary)
dectionaryRouter.get('/',getAlldictionaries)
dectionaryRouter.delete('/:id',protectedRouter,allowTo('admin'),Validate(deleteDectionaryVal),deleteDectionary)


                




export default dectionaryRouter