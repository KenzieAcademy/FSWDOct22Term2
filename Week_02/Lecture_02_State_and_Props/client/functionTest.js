function PlayerCard(name, age, imgUrl, isInSuperbowl) {
  let superBowlBound = isInSuperbowl;

  superBowlBound = !superBowlBound;

  console.log(superBowlBound);
}

PlayerCard("test", 4, "test", false);
