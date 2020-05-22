import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import { shuffleArray } from '../../shared/utility'

const burger = (props) => {
  
    
    let ingredientsArray = Object.keys(props.ingredients).map(igk => {
        return {key: igk, count: props.ingredients[igk]}    
    })

    let flattenIngredients = ingredientsArray.map(ig => {
        return [...Array(ig.count)].map((_,i) => {
            return (<BurgerIngredient 
                key={ig.key + i}
                type={ig.key}
            />)
        })
    }).flat()
    
    shuffleArray(flattenIngredients)


    if (flattenIngredients.length === 0){
        flattenIngredients = <p>Please startd adding ingredients</p>
    }    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {flattenIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;