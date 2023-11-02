// class Program1
public class Program1 {
	// main method
    public static void main(String args[]) {
	// arrayInteger
        int arrayInteger[][] = { { 0, 1, 0 }, { 1, 1, 0 } };
       // diplay replace array
        System.out.println("changed array display ...");
        for (int i = 0; i < arrayInteger.length; i++) {
            for (int j = 0; j < arrayInteger[i].length; j++) {
                if(arrayInteger[i][j]==0){
                    System.out.print(arrayInteger[i][j]+": NO it is wrong  ");
                }
                else if(arrayInteger[i][j]==1){
                    System.out.print(arrayInteger[i][j]+":YES it is right ");
                }
            }
            System.out.print("\n");
        }
        
    }
}