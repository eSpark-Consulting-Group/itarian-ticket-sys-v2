import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Platform, UIManager, Alert } from 'react-native';

import {
  ModalHeader,
  ModalView,
  FloatButton,
  Loader,
} from '../../../../components';
import { deleteOrganization } from '../../utils/functions';
import Overview from './Overview';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Company = () => {
  const routes: any = useRoute();
  const navigation: any = useNavigation();
  const companyDetails: any = routes?.params?.companyDetails;
  const [loader, setLoader] = useState(false);

  const deleteOrganizationFunc = (id: number) => {
    setLoader(true);
    console.log('companyDetails', id);
    deleteOrganization(id)
      .then(res => {
        setLoader(false);
        if (res?.status) {
          navigation?.goBack();
        }
      })
      .catch(err => {
        console.log('delete Organization failed', err);
        setLoader(false);
      });
  };

  return (
    <ModalView>
      <ModalHeader
        icon="office-building-marker-outline"
        title={companyDetails?.name}
      />
      <Loader isShow={loader} />
      <Overview />
      <FloatButton
        icon="delete"
        onPress={() => {
          Alert.alert(
            'Delete Organization?',
            'Are you sure you want to delete this Organization permanently',
            [
              {
                text: 'Yes',
                style: 'default',
                onPress: () => deleteOrganizationFunc(companyDetails?.id),
              },
              {
                text: 'No',
                style: 'cancel',
                onPress: () => console.log('Pressed Cancel on Delete'),
              },
            ],
          );
        }}
      />
    </ModalView>
  );
};

export default Company;
