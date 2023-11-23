import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionDescription, setTransactionDescription] = useState('');
  const [transactionType, setTransactionType] = useState('expense');

  const addTransaction = () => {
    if (transactionAmount && transactionDescription) {
      const newTransaction = {
        id: Math.random().toString(),
        amount: parseFloat(transactionAmount),
        description: transactionDescription,
      };

      if (transactionType === 'expense') {
        setExpenses((prevExpenses) => [...prevExpenses, newTransaction]);
      } else {
        setIncome((prevIncome) => [...prevIncome, newTransaction]);
      }

      setTransactionAmount('');
      setTransactionDescription('');
    }
  };

  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text>{item.description}</Text>
      <Text>${item.amount.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Expense Tracker</Text>

      <View style={styles.transactionTypeButtons}>
        <Button title="Expense" onPress={() => setTransactionType('expense')} />
        <Button title="Income" onPress={() => setTransactionType('income')} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={transactionAmount}
        onChangeText={(text) => setTransactionAmount(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={transactionDescription}
        onChangeText={(text) => setTransactionDescription(text)}
      />

      <Button title="Add Transaction" onPress={addTransaction} />

      <Text style={styles.sectionHeading}>Expenses</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={renderTransactionItem}
      />

      <Text style={styles.sectionHeading}>Income</Text>
      <FlatList
        data={income}
        keyExtractor={(item) => item.id}
        renderItem={renderTransactionItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  transactionTypeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
});

export default ExpenseTracker;
