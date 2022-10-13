import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { camera } from "ionicons/icons";
import React, { useState, useRef, useContext } from "react";
import {
  Plugins,
  CameraResultType,
  CameraSource,
  Capacitor,
} from "@capacitor/core";
import { useHistory } from "react-router-dom";

import MemoriesContext, { MemoryType, Photo } from "../data/memories-context";

const { Camera } = Plugins;

const customAlertOptions = {
  header: "MEMORY TYPES",
};

const NewMemory: React.FC = () => {
  const [takenPhoto, setTakenPhoto] = useState<Photo>();

  const [chosenMemoryType, setChosenMemoryType] = useState<MemoryType>("good");

  const memoriesCtx = useContext(MemoriesContext);

  const titleRef = useRef<HTMLIonInputElement>(null);
  //  const filePickerRef = useRef<HTMLInputElement>(null);

  const history = useHistory();

  const selectMemoryTypeHandler = (event: CustomEvent) => {
    const selectedMemoryType = event.detail.value;
    setChosenMemoryType(selectedMemoryType);
  };

  // const openFilePicker = () => {
  //   filePickerRef.current!.click();
  // };

  // const pickFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target!.files![0];
  //   const fr = new FileReader();

  //   fr.onload = () => {
  //     setTakenPhoto({
  //       path: undefined,
  //       preview: fr.result!.toString()
  //     });
  //   };

  //   fr.readAsDataURL(file);
  // };

  const takePhotoHandler = async () => {
    try {
      if (!Capacitor.isPluginAvailable("Camera")) {
        //        openFilePicker();
        return;
      }

      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 80,
        width: 500,
      });

      if (!photo || !photo.webPath) {
        return;
      }

      setTakenPhoto({
        path: photo.path || undefined,
        preview: photo.webPath,
      });
    } catch (error) {
      //      openFilePicker();
      console.log(error);
    }
  };

  const addMemoryHandler = async () => {
    const enteredTitle = titleRef.current?.value;

    if (
      !enteredTitle ||
      enteredTitle.toString().trim().length === 0 ||
      !takenPhoto ||
      !chosenMemoryType
    ) {
      return;
    }

    memoriesCtx.addMemory(
      takenPhoto,
      enteredTitle.toString(),
      chosenMemoryType
    );

    history.length > 0 ? history.goBack() : history.replace("/good-memories");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/good-memories" />
          </IonButtons>
          <IonTitle>Add New Memory</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Memory Title</IonLabel>
                <IonInput type="text" ref={titleRef} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonSelect
                interfaceOptions={customAlertOptions}
                onIonChange={selectMemoryTypeHandler}
                value={chosenMemoryType}
              >
                <IonSelectOption value="bad">Bad Memory</IonSelectOption>
                <IonSelectOption value="good">Good Memory</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>
          <IonRow className="ion-text-center ion-padding-top">
            <IonCol>
              <div className="image-preview">
                {!takenPhoto && <h3>No Photo Chosen</h3>}
                {takenPhoto && <img src={takenPhoto.preview} alt="Preview" />}
              </div>
              <IonButton fill="clear" onClick={takePhotoHandler}>
                <IonIcon icon={camera} slot="start" />
                <IonLabel>Take Photo</IonLabel>
              </IonButton>
              {/*<input type="file" hidden ref={filePickerRef} onChange={pickFileHandler} />*/}
            </IonCol>
          </IonRow>
          <IonRow className="ion-padding-top">
            <IonCol className="ion-text-center">
              <IonButton onClick={addMemoryHandler}>Add Memory</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default NewMemory;
