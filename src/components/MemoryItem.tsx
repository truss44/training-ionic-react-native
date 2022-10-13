import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import React from "react";

const MemoryItem: React.FC<{ image: string; title: string }> = (props) => {
  return (
    <IonCard className="memory-item">
      <img src={props.image} alt={props.title} />
      <IonCardHeader>
        <IonCardTitle>{props.title}</IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default MemoryItem;
