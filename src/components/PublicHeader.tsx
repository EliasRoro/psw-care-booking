import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type PublicHeaderProps = {
  actionLabel: string;
  actionHref: '/book' | '/contact';
};

export function PublicHeader({ actionLabel, actionHref }: PublicHeaderProps) {
  return (
    <View style={styles.header}>
      <Link href="/" asChild>
        <Pressable>
          <Text style={styles.brand}>PSW <Text style={styles.accent}>/</Text> CARE</Text>
          <Text style={styles.subline}>Home support, thoughtfully matched</Text>
        </Pressable>
      </Link>
      <Link href={actionHref} asChild>
        <Pressable style={styles.action}><Text style={styles.actionText}>{actionLabel}</Text></Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { width: '100%', backgroundColor: '#111615', paddingHorizontal: 24, paddingVertical: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { color: '#f7f3ec', fontSize: 17, fontWeight: '900', letterSpacing: 1.5 },
  accent: { color: '#e9a06f' },
  subline: { color: '#aab5ae', fontSize: 10, marginTop: 4, letterSpacing: 0.4 },
  action: { borderWidth: 1, borderColor: '#73847c', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 2 },
  actionText: { color: '#f7f3ec', fontSize: 12, fontWeight: '800' },
});
