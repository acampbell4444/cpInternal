import React from 'react'
import {Link} from 'react-router'

export default function Home({user}) {
  return (
    <div id='homeBody'>
      <div className='homeContent'>
        <h1 id='homeTitle'>Alan <span id='midInit'> James </span> Campbell</h1>
        <p className='homeBullets' id='hmBullet1'> Boat Captain </p>
        <p className='homeBullets' id='hmBullet2'> Software Engineer </p>
        <p className='homeBullets' id='hmBullet3'> Writer </p>
        <p className='homeBullets' id='hmBullet4'> Adventurer </p>
      </div>
    </div>
  )
}
