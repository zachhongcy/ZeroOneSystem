import { Ionicons } from '@expo/vector-icons';
import Modal, { Icon } from 'native-base';
import { SafeAreaView, Pressable, Text } from 'react-native';
import PropTypes from 'prop-types';

export default function ImagePickerModal({
    isVisible,
    onClose,
    onImageLibraryPress,
    onCameraPress
}) {
    return (
        <Modal
            isOpen={isVisible}
            onClose={onClose}
            onBackdropPress={onClose}
            // style={styles.imageChangeModal}
        >
            <SafeAreaView 
                // style={styles.buttons}
            >
                <Pressable
                    // style={styles.imageChangeButton}
                    onPress={onImageLibraryPress}
                >
                    <Icon as={Ionicons} name={'image'} />
                    <Text 
                        // style={styles.imageChangeText}
                    >Gallery</Text>
                </Pressable>
                <Pressable
                    // style={styles.imageChangeButton}
                    onPress={onCameraPress}
                >
                    <Icon as={Ionicons} name={'camera'} />
                    <Text 
                        // style={styles.imageChangeText}
                    >Camera</Text>
                </Pressable>
            </SafeAreaView>
        </Modal>
    );
}

ImagePickerModal.propTypes = {
    isVisible: PropTypes.bool,
    onClose: PropTypes.func,
    onImageLibraryPress: PropTypes.func,
    onCameraPress: PropTypes.func
};