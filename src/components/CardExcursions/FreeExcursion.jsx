import React from 'react'

export default function FreeExcursion({item}) {
  const formattedText = item.description.replace(/ /g, '\n').replace(/&gt;&gt;&gt;/g, '...');
  const formattedText1 = formattedText.replace(/<br\s*[\/]?>/gi, "\n");



  return (
    <div className='excursion-description-div'>
        <h5 className='title-excursion-pf'>{item.name}</h5>
        <p className='description-excursion-pf'> {formattedText1}</p>
    </div>
  )
}
