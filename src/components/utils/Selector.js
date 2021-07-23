// import component
import React, { Component, useRef, useState } from 'react';
import { View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';

const DropDown = ({ items, setSelectedGroups }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <MultiSelect
      // hideTags
      // styleSelectorContainer={{ borderRadius: 10 }}
      styleDropdownMenu={{ height: 80, borderRadius: 10 }}
      // styleTextDropdownSelected={{ backgroundColor: 'red', height: 30 }}
      // styleMainWrapper={{ backgroundColor: 'red' }}
      styleDropdownMenuSubsection={{
        borderWidth: 1,
      }}
      styleItemsContainer={{
        borderWidth: 1,
      }}
      hideSubmitButton
      items={items}
      uniqueKey="uid"
      displayKey="name"
      onSelectedItemsChange={item => {
        setSelectedItems(() => {
          setSelectedGroups(() => {
            const selectedGr = item.map(id => {
              return items.find(el => el.uid === id);
            });
            return selectedGr;
          });
          return item;
        });
      }}
      selectedItems={selectedItems}
      selectText="Pick Groups"
      searchInputPlaceholderText="Search Items..."
      onChangeInput={text => console.log(text)}
      // altFontFamily="ProximaNova-Light"
      tagRemoveIconColor="#CCC"
      tagBorderColor="#CCC"
      tagTextColor="#CCC"
      selectedItemTextColor="#CCC"
      itemTextColor="#000"
      searchInputStyle={{ color: '#CCC' }}
      submitButtonColor="#CCC"
      submitButtonText="Submit"
    />
  );
};
export default DropDown;
