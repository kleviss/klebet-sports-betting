import { supabase } from "../config/supabase";

export interface Transaction {
  id: string;
  user_id: string;
  type: "deposit" | "withdrawal" | "bet" | "win";
  amount: number;
  status: "pending" | "completed" | "failed";
  created_at: string;
}

export const getUserBalance = async (userId: string): Promise<number> => {
  const { data, error } = await supabase.from("user_balances").select("balance").eq("user_id", userId).single();

  if (error) {
    console.error("Error fetching balance:", error);
    return 0;
  }

  return data?.balance || 0;
};

export const updateUserBalance = async (userId: string, newBalance: number) => {
  const { error } = await supabase
    .from("user_balances")
    .upsert({ user_id: userId, balance: newBalance })
    .eq("user_id", userId);

  if (error) {
    throw new Error("Failed to update balance");
  }
};

export const createTransaction = async (
  userId: string,
  type: Transaction["type"],
  amount: number
): Promise<Transaction> => {
  const { data, error } = await supabase
    .from("transactions")
    .insert({
      user_id: userId,
      type,
      amount,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    throw new Error("Failed to create transaction");
  }

  return data;
};

export const getUserTransactions = async (userId: string): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }

  return data || [];
};
