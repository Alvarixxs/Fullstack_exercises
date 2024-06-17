import {FlatList, View, StyleSheet, Pressable} from 'react-native';
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";
import {useNavigate} from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({repositories}) => {
  const navigate = useNavigate();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      renderItem={({item}) => (
        <Pressable onPress={()=>navigate(`/${item.id}`)}>
          <RepositoryItem repository={item}/>
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();

  if(loading) {
    return <Text>Loading ...</Text>
  }

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;