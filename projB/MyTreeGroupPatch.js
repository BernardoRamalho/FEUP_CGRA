/**
 * MyTreeGroupPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTreeGroupPatch extends CGFobject {
	constructor(scene) {
        super(scene);

        //Trees with randomish dimensions
        this.tree1 = new MyLSPlant(this.scene);
        
        this.tree2 = new MyLSPlant(this.scene);

        this.tree3 = new MyLSPlant(this.scene);

        this.tree4 = new MyLSPlant(this.scene);
        
        this.tree5 = new MyLSPlant(this.scene);

        this.tree6 = new MyLSPlant(this.scene);

        this.tree7 = new MyLSPlant(this.scene);

        this.tree8 = new MyLSPlant(this.scene);

        this.tree9 = new MyLSPlant(this.scene);


        //Values to desilign the trees
        this.value1 = Math.random() * -0.3;
        
        this.value2 = Math.random() * 0.3;
        
        this.value3 = Math.random() * -0.3;
        
        this.value4 = Math.random() * 0.3;
        
        this.value5 = Math.random() * -0.3;
        
        this.value6 = Math.random() * -0.3;
        
        this.value7 = Math.random() * 0.3;
        
        this.value8 = Math.random() * -0.3;
        
        this.value9 = Math.random() * 0.3;
    }
    
    display() {

        var trees = [this.tree1, this.tree2, this.tree3, this.tree4, this.tree5, this.tree6, this.tree7, this.tree8, this.tree9];

        var desilignement_values = [this.value1, this.value2, this.value3, this.value4, this.value5, this.value6, this.value7, this.value8, this.value9]

        var row = 0;

        var line = 0;

        for (var i = 0; i < 9; i++) {

            this.scene.pushMatrix();

            this.scene.translate(row*3.5 - 3.5 + desilignement_values[i], 0, line*3.5 - 3.5 + desilignement_values[8-i]);

            this.scene.scale(4,2,4);
            
            trees[i].display();

            this.scene.popMatrix();

            line += 1;

            if ((i + 1) % 3 == 0){
                row++;
                line = 0;
            }

        }

    }
}